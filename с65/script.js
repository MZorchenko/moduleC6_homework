const btnSize = document.querySelector('.btn-size');
btnSize.addEventListener('click', () => {
    alert( 'Размер вашего экрана ' + screen.width + 'x' + screen.height );
});