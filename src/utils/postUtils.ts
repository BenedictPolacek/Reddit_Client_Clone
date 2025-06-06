export function getHalf(array: React.ReactElement[], half: 1 | 2){
    return array.filter((_, index) => index % 2 === half - 1)
}

export function getTimeAgo(createdAt: number): string {
    const years = (Date.now()/1000 - createdAt) / (60 * 60 * 24 * 365.25);
    if(years > 1) return `${Math.floor(years)} years ago`;
    const days = years * 365.25;
    if(days > 1) return `${Math.floor(days)} days ago`;
    const hours = days * 24;
    if(hours > 1) return `${Math.floor(hours)} hours ago`;
    const minutes = hours * 60;
    if(minutes > 1) return `${Math.floor(minutes)} minutes ago`;
    const seconds = minutes * 60
    return `${Math.floor(seconds)} seconds ago`;
}

export function isPictureFormat(url: string){
    return url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.svg')
}