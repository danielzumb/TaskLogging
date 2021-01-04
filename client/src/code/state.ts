export function createState(parentComponent){
    return {

        showWelcome: true,
        currentView: null,

        showTaskPage: function(this: any, visible: boolean): void {
            this.setState({
                showWelcome: false,
                currentView: "logging"
            });
        }.bind(parentComponent),

        showReportingPage: function(this: any, visible: boolean): void {
            this.setState({
                showWelcome: false,
                currentView: "reporting"
            });
        }.bind(parentComponent)
    }
}