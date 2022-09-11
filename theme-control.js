export default class ThemeControl {

    constructor(darkThemeCssFilePath) {
        this.darkThemeCssFilePath = darkThemeCssFilePath;
    }

    initialize = () => {
        this.isDarkMode = false;    // true: dark mode; false: light mode
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.isDarkMode = true;
            }
        }

        if (this.isDarkMode) {
            this.addDarkModeStyleSheet();
        }
    }

    addDarkModeStyleSheet = () => {
        // Already added.
        let id = 'dark-theme-css';
        let darkThemeCssTag = document.getElementById(id);

        if (!!darkThemeCssTag) {
            console.log('dark theme css already exists');
            return;
        }

        let head = document.getElementsByTagName('head')[0];

        // Creating link element
        let style = document.createElement('link')
        style.href = this.darkThemeCssFilePath;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.id = id;
        head.append(style);
    };
}