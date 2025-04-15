document.querySelector('.user-info').addEventListener('mouseenter', function() {
    document.querySelector('.popup').style.display = 'block';
});
document.querySelector('.user-info').addEventListener('mouseleave', function() {
    document.querySelector('.popup').style.display = 'none';
});