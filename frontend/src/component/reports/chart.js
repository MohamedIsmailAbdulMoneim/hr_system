import React, { Component } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {
    render() {
        return (
            <div className="chart">
                <Pie
                    data={{
                        labels: ['Boston', 'dasdsad', 'dasdsadasd', 'dasdaasdasdada'],
                        datasets:[
                            {
                                label: 'asdasdasd',
                                data: [
                                    55557,9797979,8879797,9797797,4545454,545454
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ]
                            }
                        ]
                    }}
                    options={{maintainAspectRatio: false}}
                /> 
                </div>
        )
    }
}

export default Chart