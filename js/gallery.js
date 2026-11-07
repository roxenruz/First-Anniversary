const memories = [
    {
        id: 1,
        image: "assets/photos/memory-01.jpeg",
        category: "favorite",
        date: "09 September 2024",
        title: "Where it all began",
        description: "We clicked a group photo but i edited it so only we should be in frame."
    },

    {
        id: 2,
        image: "assets/photos/memory-02.jpeg",
        category: "special",
        date: "20 August 2025",
        title: "A beautiful day",
        description: "A simple day that somehow became one of my favorite memories."
    },

    {
        id: 3,
        image: "assets/photos/memory-silly.jpeg",
        category: "places",
        date: "5 September 2025",
        title: "Natural",
        description: "A memory that still makes me smile every time I think about it."
    },

    {
        id: 4,
        image: "assets/photos/memory-04.jpeg",
        category: "special",
        date: "18 September 2025",
        title: "Us Together",
        description: "Together, Forever. We look cute together"
    },

    {
        id: 5,
        image: "assets/photos/memory-05.jpeg",
        category: "places",
        date: "01 August 2026",
        title: "Outing Together",
        description: "One more moment that became part of our story."
    },

    {
        id: 6,
        image: "assets/photos/memory-03.jpeg",
        category: "favourite",
        date: "01 August 2026",
        title: "One year",
        description: "One year of memories, laughter, conversations and us."
    },
    {
        id: 7,
        image: "assets/photos/memory-07.jpeg",
        category: "funny",
        date: "26 September 2026",
        title: "One year",
        description: "One year of memories, laughter, conversations and us."
    },
    {
        id: 8,
        image: "assets/photos/memory-08.jpeg",
        category: "favourite",
        date: "13 February 2026",
        title: "One year",
        description: "One year of memories, laughter, conversations and us."
    }

];

const memoryGrid = document.getElementById("memoryGrid");
const filterButtons = document.querySelectorAll(".filter-button");

const viewer = document.getElementById("imageViewer");
const viewerBackdrop = document.getElementById("viewerBackdrop");
const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

const viewerImage = document.getElementById("viewerImage");
const viewerDate = document.getElementById("viewerDate");
const viewerTitle = document.getElementById("viewerTitle");
const viewerDescription = document.getElementById("viewerDescription");

let currentMemories = [];
let currentIndex = 0;


function renderMemories(category = "all") {

    memoryGrid.innerHTML = "";

    currentMemories = category === "all"
        ? [...memories]
        : memories.filter(memory => memory.category === category);

    if (currentMemories.length === 0) {
        memoryGrid.innerHTML = `
            <div class="empty-memory">
                No memories found.
            </div>
        `;

        return;
    }

    currentMemories.forEach((memory, index) => {

        const card = document.createElement("article");

        card.className = "memory-card";

        card.innerHTML = `
            <div class="memory-image-wrapper">
                <img
                    src="${memory.image}"
                    alt="${memory.title}"
                    loading="lazy"
                    onerror="this.parentElement.classList.add('image-error')"
                >

                <div class="memory-overlay">
                    <span class="memory-category">
                        ${memory.category}
                    </span>

                    <h3>${memory.title}</h3>

                    <p>${memory.date}</p>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            openViewer(index);
        });

        memoryGrid.appendChild(card);
    });
}


function openViewer(index) {

    currentIndex = index;

    const memory = currentMemories[currentIndex];

    viewerImage.src = memory.image;
    viewerImage.alt = memory.title;

    viewerDate.textContent = memory.date;
    viewerTitle.textContent = memory.title;
    viewerDescription.textContent = memory.description;

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeViewer() {

    viewer.classList.remove("active");

    document.body.style.overflow = "";
}


function showPrevious() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentMemories.length - 1;
    }

    updateViewer();
}


function showNext() {

    currentIndex++;

    if (currentIndex >= currentMemories.length) {
        currentIndex = 0;
    }

    updateViewer();
}


function updateViewer() {

    const memory = currentMemories[currentIndex];

    viewerImage.src = memory.image;
    viewerImage.alt = memory.title;

    viewerDate.textContent = memory.date;
    viewerTitle.textContent = memory.title;
    viewerDescription.textContent = memory.description;
}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderMemories(button.dataset.filter);
    });
});


viewerClose.addEventListener("click", closeViewer);

viewerBackdrop.addEventListener("click", closeViewer);

viewerPrev.addEventListener("click", showPrevious);

viewerNext.addEventListener("click", showNext);


document.addEventListener("keydown", event => {

    if (!viewer.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeViewer();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }
});


renderMemories();