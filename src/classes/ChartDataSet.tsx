export class ChartDataSet {
    hidden: boolean;
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    tension: number;

    constructor(hidden: boolean, label: string, 
        data: number[], backgroundColor: string,
        borderColor: string, borderWidth: number,
        tension: number) {
        this.hidden = hidden;
        this.label = label;
        this.data = data;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.tension = tension;
    }
}