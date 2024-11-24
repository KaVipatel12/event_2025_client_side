import React, { useEffect } from 'react';

function SearchBar() {
  useEffect(() => {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return; // Ensure input exists

    const handleSearch = () => {
      const searchValue = searchInput.value.toLowerCase();
      const cardsContainer = document.getElementById('cardsContainer');
      if (!cardsContainer) return; // Ensure container exists

      const cards = cardsContainer.querySelectorAll('.card');

      cards.forEach((card) => {
        const eventName = card.getAttribute('data-event-name');
        if (!eventName) return; // Skip if data-event-name is missing

        card.style.display = eventName.toLowerCase().includes(searchValue) ? '' : 'none';
      });
    };

    searchInput.addEventListener('input', handleSearch);

    return () => {
      searchInput.removeEventListener('input', handleSearch);
    };
  }, []);

  return (
    <div className="search-bar">
      <input
        type="text"
        id="searchInput"
        className="form-control"
        placeholder="Search by event name"
      />
    </div>
  );
}

export default SearchBar;
