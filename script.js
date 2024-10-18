const facultyCards = document.querySelectorAll('.faculty-card');
const totalCards = facultyCards.length;
const cardsPerSlide = 3; // Number of cards to show per slide
let currentIndex = 0;

function showNextCards() {
    // Calculate the new position
    currentIndex = (currentIndex + cardsPerSlide) % totalCards;

    // Hide all cards first
    facultyCards.forEach((card, index) => {
        card.style.display = 'none';
        card.classList.remove('slide-in');
    });

    // Show the next set of cards
    for (let i = 0; i < cardsPerSlide; i++) {
        const cardIndex = (currentIndex + i) % totalCards;
        facultyCards[cardIndex].style.display = 'flex';
        // Add sliding animation
        facultyCards[cardIndex].classList.add('slide-in');
    }
}

// Initial display of the first set of cards
showNextCards();

// Slide every 5 seconds
setInterval(() => {
    showNextCards();
}, 5000);


document.addEventListener('DOMContentLoaded', () => {
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            faq.classList.toggle('active');
        });
    });
});