export const TypeMixin = {
  computed: {
    isTypeYearly () {
      return this.selectedCalendarType === 'Yearly'
    },
    isNotTypeYearly () {
      return this.selectedCalendarType === 'Daily' || this.selectedCalendarType === 'Weekly' || this.selectedCalendarType === 'Monthly'
    },
    isTypeMonthly () {
      return this.selectedCalendarType === 'Monthly'
    },
    isTypeDailyWeekly () {
      return this.selectedCalendarType === 'Weekly' || this.selectedCalendarType === 'Daily'
    },
    isTypeWeeklyMonthly () {
      return this.selectedCalendarType === 'Weekly' || this.selectedCalendarType === 'Monthly'
    }
  }
}
