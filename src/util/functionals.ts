async function copyTextToClipboard(text: string | number) {
    try {
        await navigator.clipboard.writeText(text.toString());
        return 'Content copied to clipboard!';
    } catch (err) {
        return null
    }
}