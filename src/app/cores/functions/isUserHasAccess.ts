export function flattenMenu(menuItems: any[]): any[] {
    let flattened: any[] = [];

    menuItems.forEach(menuItem => {
        flattened.push(menuItem);

        if (Array.isArray(menuItem.children)) {
            flattened = flattened.concat(flattenMenu(menuItem.children));
        }
    });
    flattened.push({ label: 'Finantial Year', url: '/dashboard/financial-year' });
    flattened.push({ label: 'Forget Password', url: '/page/forget-password' });
    flattened.push({ label: 'Register', url: '/page/register' });
    flattened.push({ label: 'Register', url: '/page/login' });
    flattened.push({ label: 'Register', url: '/page/unautherized-access' });

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
