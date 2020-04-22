import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';
import getChartCertificationRequest from '@salesforce/apex/CertificationManagementCharts.getChartCertificationRequest'

export default class CertificationManagementCharts extends LightningElement {
    chartInitialized = false;
    renChart;

    @wire(getChartCertificationRequest)
    chartFetch({ error, data }) {
        if (data) {
            const chartKeys = Object.keys(data);
            const chartValues = Object.values(data);
            this.initializeChart(chartKeys, chartValues);
        }
        if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Loading Data',
                    message: error.message,
                    variant: 'error'
                })
            )
        }
    }

    initializeChart(chartKeys, chartValues) {
        if (!this.chartInitialized) {
            loadScript(this, ChartJS).then(() => {
                this.chartInitialized = true;
                this.buildChart(chartKeys, chartValues);
            }).catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Loading Chart JS',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
        }
    }

    buildChart = (chartKeys, chartValues) => {

        let canvas = this.template.querySelector('canvas');
        let context = canvas.getContext('2d');
        let chartColors = [];
        let chartColorsBorder = [];

        for(let i = 0; i < chartKeys.length; i++) {
            const rgb = this.generateColor();
            chartColors.push('rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 0.2)');
            chartColorsBorder.push('rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 1)');
        }

        new Chart(context, {
            type: 'bar',
            data: {
                labels: chartKeys,
                datasets: [
                    {
                        label: 'Certification Names',
                        data: chartValues,
                        backgroundColor: chartColors,
                        borderColor: chartColorsBorder,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                legend: {
                    position: 'bottom',
                    padding: 10
                },
                title: {
                    display: true,
                    text: 'Certifiaction Requests for each Certification Category'
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: true,
                                drawBorder: true,
                                drawOnChartArea: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            },
                            gridLines: {
                                display: true,
                                drawBorder: true,
                                drawOnChartArea: false
                            }
                        }
                    ]
                },
                responsive: true
            }
        });
    }

    generateColor = () => {
        let rgb = [];
        for (let i = 0; i < 3; i++) {
            rgb.push(Math.floor(Math.random() * 255));
        }
        return rgb;
    }
}