/* globals $ */
$.fn.gallery = function (rows) {
    rows = rows || 4;

    $this = this;
    var $selected = $('.selected'),
        $currentSelectImage = $('#current-image'),
        $previousSelectImage = $('#previous-image'),
        $nextSelectImage = $('#next-image'),
        $galleryList = $('.gallery-list'),
        $imageContainers = $this.find('.image-container');
    $selected.hide();

    $this.addClass('gallery');

    $galleryListItems = $('.gallery-list').children();

    var counter = 0;
    $galleryListItems.each(function(index, element){
        $element = $(element);
        if(counter === rows){
            $element.addClass('clearfix');
            counter = 0;
        }

        counter++;
    });

    $galleryList.on('click', 'img', function(){
        $this = $(this);

        $galleryList.addClass('blurred');
        $galleryList.append($('<div />').addClass('disabled-background'));

        var currentIndex = $this.attr('data-info');
        setImages(currentIndex);

        $selected.show();
    });

    $currentSelectImage.on('click', function(){
        $selected.hide();
        $galleryList.removeClass('blurred');
        $galleryList.children('.disabled-background').remove();
    });

    $nextSelectImage.on('click', function(){
        setImages($nextSelectImage.attr('data-info'));
    });

    $previousSelectImage.on('click', function(){
        setImages($nextSelectImage.attr('data-info'));
    });

    function setImages(currentTempIndex){
        var currentIndexFunction = currentTempIndex,
            nextIndex = getNextIndex(currentIndexFunction),
            previousIndex = getPreviousIndex(currentIndexFunction),
            $currentImage = $('img[data-info="' + currentIndexFunction + '"]'),
            $nextImage = $('img[data-info="' + nextIndex + '"]'),
            $previousImage = $('img[data-info="' + previousIndex + '"]');

        $currentSelectImage.attr('src', $currentImage.attr('src')).attr('data-info', currentIndexFunction);
        $nextSelectImage.attr('src', $nextImage.attr('src')).attr('data-info', nextIndex);
        $previousSelectImage.attr('src', $previousImage.attr('src')).attr('data-info', previousIndex);
    }

    function getNextIndex(index){
        index++;

        if(index > $imageContainers.length){
            index = 1;
        }

        return index;
    }

    function getPreviousIndex(index){
        index--;

        if(index < 1){
            index = $imageContainers.length
        }

        return index;
    }
};