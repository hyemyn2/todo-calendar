export const btnUtils = {
  methods: {
    showToday () {
      this.CHANGE_FETCHED_DATE(new Date(this.todayDateYear, this.todayDateMonth, this.todayDateDate))
    },
    showPrevPage () {
      if (this.selectedCalendarType === 'Monthly') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear, this.fetchedDateMonth - 1, this.fetchedDateDate))
      } else if (this.selectedCalendarType === 'Weekly') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear, this.fetchedDateMonth, this.fetchedDateDate - 7))
      } else if (this.selectedCalendarType === 'Daily') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear, this.fetchedDateMonth, this.fetchedDateDate - 1))
      } else if (this.selectedCalendarType === 'Yearly') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear - 1, this.fetchedDateMonth, this.fetchedDateDate))
      }
    },
    showNextPage () {
      if (this.selectedCalendarType === 'Monthly') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear, this.fetchedDateMonth + 1, this.fetchedDateDate))
      } else if (this.selectedCalendarType === 'Weekly') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear, this.fetchedDateMonth, this.fetchedDateDate + 7))
      } else if (this.selectedCalendarType === 'Daily') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear, this.fetchedDateMonth, this.fetchedDateDate + 1))
      } else if (this.selectedCalendarType === 'Yearly') {
        this.CHANGE_FETCHED_DATE(new Date(this.fetchedDateYear + 1, this.fetchedDateMonth, this.fetchedDateDate))
      }
    }
  }
}
