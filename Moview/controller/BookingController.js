class BookingController {

    constructor(cinemaManager) {
        this.cinemaManager = cinemaManager;
    }

    selectShowing = (showingId) => {
        var showing = this.cinemaManager.getShowingById(showingId);
        return showing.getBookingProcessDisplayInfo();
    }
}

module.exports = BookingController;