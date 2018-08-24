/**
 * Re-adjust cards that they are just large enough to show the content to save space
 */
import imagesLoaded from 'imagesloaded'; // Used to postpone execution until images finish loading

function resizeGridItem(item) {
    let grid = document.querySelector(`grid`); 
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue(`grid-auto-rows`)); // Get default height span for grid
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue(`grid-row-gap`)); // Get default grid offset

    let rowSpan = Math.ceil(
        (item.querySelector(`.content`).getBoundingClientRect().height + rowGap)
        / (rowHeight + rowGap)
    ); // The span or size of the card should be proportion of height of content and the default total height (multiples of rowHeight)
}

function resizeAllGridItems() {
    let allItems = document.querySelectorAll('.item');
    allItems.forEach( item => imagesLoaded(item, resizeInstance) ); // Resize all the items
}

function resizeInstance(instance) {
    let item = instance.elements[0];
    resizeGridItem(item); // Call the resize
}

/* EVENTS */
window.onload = resizeAllGridItems();
window.addEventListener('resize', resizeAllGridItems);