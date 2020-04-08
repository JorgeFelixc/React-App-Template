const NAME_LOCAL_THEME = "current-theme";


    // "--theme-bg": "#323332",
    // "--primary-color": "#1B1B1B",

    export const BlackTheme = { 
    "--theme-bg": "#1B1B1B",
    "--theme-color": "white",
    "--primary-color": "#323332",

}

export const WhiteTheme = {
    "--theme-bg": "#F9F9F9",
    "--theme-color": "black",
    "--primary-color": "white",
}


export function ChangeTheme(theme){
    Object.entries(theme).filter((item, index) => { 
        document.documentElement.style.setProperty(item[0], item[1]);
    });
    localStorage.setItem(NAME_LOCAL_THEME, JSON.stringify(theme));
}

export function ChangeURI(uri){
    window.location.href = uri;
}

export function setCurrentTheme(){
    let themenInBrowser = localStorage.getItem(NAME_LOCAL_THEME);
    if(themenInBrowser){
        ChangeTheme(JSON.parse(themenInBrowser));
    }
}