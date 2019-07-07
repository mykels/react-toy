export const loadScript = ({document, id, src}) => {
    let scriptElement, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) return;
    scriptElement = document.createElement('script');
    scriptElement.id = id;
    scriptElement.src = src;
    fjs.parentNode.insertBefore(scriptElement, fjs);
};