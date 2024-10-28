// Select elements
const submitButton = document.getElementById("submit-review");
const companyInput = document.getElementById("company-input");
const stateInput = document.getElementById("state-input");
const reviewInput = document.getElementById("review-input");
const reviewsFeed = document.getElementById("reviews-feed");
const smileys = document.querySelectorAll(".smiley");
const ratingDisplay = document.getElementById("rating-display");
const searchInput = document.getElementById("search-input");

let selectedRating = 0;
let reviews = []; // Array to store reviews

// Function to update the displayed rating with a visual indication
function updateRatingDisplay() {
    if (selectedRating === "1") {
        ratingDisplay.textContent = "(Selected: Sad 😞)";
    } else if (selectedRating === "2") {
        ratingDisplay.textContent = "(Selected: Neutral 😐)";
    } else if (selectedRating === "3") {
        ratingDisplay.textContent = "(Selected: Happy 😊)";
    } else {
        ratingDisplay.textContent = "(No rating)";
    }
}

// Event listener for smiley rating selection
smileys.forEach(smiley => {
    smiley.addEventListener("click", () => {
        selectedRating = smiley.getAttribute("data-value");

        // Update smiley colors based on the selected rating
        smileys.forEach(s => {
            s.classList.toggle("selected", s.getAttribute("data-value") === selectedRating);
        });

        updateRatingDisplay();
    });
});

// Function to render reviews based on search filter
function renderReviews(filter = "") {
    // Clear the existing reviews feed
    reviewsFeed.innerHTML = "";

    // Filter and render reviews
    reviews
        .filter(review => review.company.toLowerCase().includes(filter.toLowerCase()))
        .forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("review-item");

            // Add review content
            reviewItem.innerHTML = `
                <div class="company-state">${review.company} - ${review.state}</div>
                <div class="review-rating">Rating: ${review.ratingText}</div>
                <div class="review-content">${review.content}</div>
                <div class="review-controls">
                    <span>Anonymous</span>
                    <span>${review.date}</span>
                </div>
            `;
            reviewsFeed.appendChild(reviewItem);
        });
}

// Function to add a new review
function addReview(company, state, content, rating) {
    let ratingText = "";
    if (rating === "1") ratingText = "Sad 😞";
    else if (rating === "2") ratingText = "Neutral 😐";
    else if (rating === "3") ratingText = "Happy 😊";

    const newReview = {
        company,
        state,
        content,
        ratingText,
        date: new Date().toLocaleString()
    };
    reviews.push(newReview);
    renderReviews(searchInput.value);
}

// Event listener for submit button
submitButton.addEventListener("click", () => {
    const company = companyInput.value.trim();
    const state = stateInput.value.trim();
    const reviewText = reviewInput.value.trim();
    
    if (company && state && reviewText && selectedRating > 0) {
        addReview(company, state, reviewText, selectedRating);
        companyInput.value = ""; 
        stateInput.value = ""; 
        reviewInput.value = ""; 
        selectedRating = 0;
        updateRatingDisplay(); 
        smileys.forEach(smiley => smiley.classList.remove("selected")); 
    } else {
        alert("Please fill out all fields and select a rating before submitting.");
    }
});

// Event listener for search input
searchInput.addEventListener("input", () => {
    const filter = searchInput.value;
    renderReviews(filter); 
});
