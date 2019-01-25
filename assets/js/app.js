$(function() {

$.getJSON('http://landscape.digitalpartner.cl/api/landscapes', function(landscapes) {
		landscapes.forEach(function(landscapes){
			agregarCard(landscapes.name, landscapes.followers, landscapes.following);

		})
        agregarCard(landscapes[0].name, landscapes[0].followers);
    });
    $('.cards').on('click', '.card', function() {
        $(this).toggleClass('card--open');
    });
    $('.cards').on('click', '.card__like', function(e) {
        $(this).toggleClass('card__like--red');
        e.preventDefault();
        e.stopPropagation();
    });

    $('.cards').on('click', '.card__follow-btn', function(e) {
        $(this).toggleClass('card__follow-btn--following');
        if ($(this).hasClass('card__follow-btn--following')) {
            $(this).text('Siguiendo');
        } else {
            $(this).text('Seguir');
        }
        return false;
    });

    $('#image').change(function() {
        $('.create__image img').attr('src', 'assets/images/squared/' + this.value);
    });

    $('#author').change(function() {
        $('.create__profile img').attr('src', 'assets/images/profiles/' + this.value);
    });


    $('.create__form').submit(function(e) {
        var title = $('#name').val(); 
        var image_src = $('#image').val(); 
        var image_name = $('#image').find(':selected').text(); 
        var author_image = $('#author').val(); 
        var author_name = $('#author').find(':selected').text(); 
        var followers = $('#followers').val(); 
        var likes = $('#likes').val(); 
        var following = $('#following').val(); 
        console.log(title, image_src, author_image, followers, likes, following);

        var new_card = $('.card').eq(0).clone();
        new_card.appendTo('.cards');
        new_card.find('.card__img').attr('src', 'assets/images/squared/' + image_src);
        new_card.find('.card__profile').attr('src', 'assets/images/profiles/' + author_image);
        new_card.find('.card__author-name').text(author_name);
        new_card.find('.card__title h2').text(title);
        new_card.find('.social__number').eq(0).text(followers);
        new_card.find('.social__number').eq(1).text(likes);
        new_card.find('.social__number').eq(2).text(following);
        new_card.find('.card__like').removeClass('card__like--red');

        //reset form
        $(this).find('input').val('');
        $(this).find('#image').val('uk.png').change();
        $(this).find('#author').val('uk.png').change();
        e.preventDefault();
    })

});

function agregarCard(title, followers, likes, following) {
    var new_card = $('.card').eq(0).clone();
    new_card.prependTo('.cards');
    new_card.find('.card__title h2').text(title);
    new_card.find('.social__number').eq(0).text(followers);
    new_card.find('.social__number').eq(1).text(likes)
    new_card.find('.social__number').eq(2).text(following);
}

