const btn = document.querySelector('.button');

btn.addEventListener ('click', e => {
    alert( 'Your screen size is ' + screen.width + 'x' + screen.height );
})