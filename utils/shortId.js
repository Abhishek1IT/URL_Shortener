function generateShortUrl() {

    let result = '';

    for (let i = 0; i < 10; i++) {
        
        const category = Math.floor(Math.random() * 3)+1;

        let rendomAscii;

        if (category === 1) {

            rendomAscii = Math.floor(Math.random() * 26) + 65;

        } else if (category === 2) {

            rendomAscii = Math.floor(Math.random() * 26) + 97;

        } else {

            rendomAscii = Math.floor(Math.random() * 10) + 48;

        }

        result += String.fromCharCode(rendomAscii);
    }

    return result;
}

export default generateShortUrl;