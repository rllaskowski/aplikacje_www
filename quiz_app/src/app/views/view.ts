type View = HTMLElement

let currentView: View = null; 

const hideView = (view: View) => {
    return new Promise(resolve => {
        view.classList.add("invisible-view");
        
        view.ontransitionend = () => {
            view.style.height = "0px";

            view.ontransitionend = null;
            resolve();
        }
    });
}

const showView = async (viewProm: Promise<View>) => {
    if (currentView) {
        await hideView(currentView);
    }

    currentView = await viewProm;

    return new Promise(resolve => {
        currentView.style.height = "auto";
              
        currentView.classList.remove("invisible-view");

        currentView.ontransitionend = () => {
            currentView.ontransitionend = null;
            resolve();
        }
    });
}

export {
    showView,
    View
}


