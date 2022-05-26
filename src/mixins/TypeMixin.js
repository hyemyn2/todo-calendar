export const TypeMixin = {
  computed: {
    isTypeYearly () {
      return this.selectedCalendarType === 'yearly'
    },
    isNotTypeYearly () {
      return this.selectedCalendarType === 'daily' || this.selectedCalendarType === 'weekly' || this.selectedCalendarType === 'monthly'
    },
    isTypeMonthly () {
      return this.selectedCalendarType === 'monthly'
    },
    isTypeDailyWeekly () {
      return this.selectedCalendarType === 'weekly' || this.selectedCalendarType === 'daily'
    },
    isTypeWeeklyMonthly () {
      return this.selectedCalendarType === 'weekly' || this.selectedCalendarType === 'monthly'
    }
  }
}
