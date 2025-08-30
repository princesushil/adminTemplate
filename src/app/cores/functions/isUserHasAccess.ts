export function flattenMenu(menuItems: any[]): any[] {
    let flattened: any[] = [];

    menuItems.forEach(menuItem => {
        flattened.push(menuItem);

        if (Array.isArray(menuItem.children)) {
            flattened = flattened.concat(flattenMenu(menuItem.children));
        }
    }); 
    

    return flattened;
}

export function hasUserAccessToMenu(targetUrl: string, menuItems: any[]): boolean {
    if (targetUrl && targetUrl !== "/") {
        const matchingItems = menuItems.filter(menuItem => menuItem.url === targetUrl);
        if (matchingItems.length === 0) {
            return false;
        }
    }
    return true;
}
