let count = 1;
document.getElementById('radio1').checked = true;

setInterval(() => {
    autoPassImage();
}, 15000)

function autoPassImage() {
    count++;
    if (count > 4) {
        count = 1;
    }
    document.getElementById('radio' + count).checked = true;
    
}