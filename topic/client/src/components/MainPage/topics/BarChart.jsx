import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState"

function BarChart() {
    const state = useContext(GlobalState)
    const [topics] = state.TopicApi.topics;
    const userData = {
        labels: topics.map((data) => data.name),
        datasets: [
            {
                label: "Thống kê số lượng post trong 1 ngày",
                data: topics.map((data) => data.post),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                    "#5b80b1",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    };
    const outputPdf = () => {
        exportPDF();
    }

    const exportPDF = () => {
        const input = document.getElementById('content');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 1, 1);
                pdf.save("File.pdf");
            });
    }

    return (
        <div className="toppic">
            <Bar id="content" data={userData} />
            <button onClick={outputPdf}>Download</button>
        </div>
    );
}

export default BarChart;