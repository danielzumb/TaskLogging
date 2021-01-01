export function createState(parentComponent){
    return {

        currentView: "welcome",

        showTaskPage: function(this: any, visible: boolean): void {
            console.log("Showing task page");
            this.setState({currentView: "logging"});
        }.bind(parentComponent),

        showReportingPage: function(this: any, visible: boolean): void {
            console.log("Showing reporting page");
            this.setState({currentView: "reporting"});
        }.bind(parentComponent)
    }
}