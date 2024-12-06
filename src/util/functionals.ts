export async function copyTextToClipboard(text: string | number) {
    try {
        console.log('Processing');
        await navigator.clipboard.writeText(text.toString());
        console.log('Copied');
        return 'Content copied to clipboard!';
    } catch (err) {
        console.log(err);
        return null
    }
}