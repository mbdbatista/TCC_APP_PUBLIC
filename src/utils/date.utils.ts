import moment from 'moment'
import momentz from 'moment-timezone'

export class DateUtils {
  static readonly isValidDate = (date: string) => {
    if (date.length !== 10)
      return false
    return moment(date).isValid()
  }

  static readonly formatDate = (date: string | Date, format: DateFormat): string => {
    const momentDate = momentz.tz(date, 'America/Sao_Paulo')
    return momentDate.format(DateFormatAdapter(format))
  }

  static readonly stringToDate = (string: string): Date => {
    const date = momentz.tz(string, 'America/Sao_Paulo').toDate()
    return date
  }
}

export enum DateFormat {
  date,
  datetime,
  englishDate,
  englishDateTime
}

const DateFormatAdapter = (format: DateFormat) => {
  switch (format) {
    case DateFormat.date:
      return 'MM/DD/YYYY'
    case DateFormat.datetime:
      return 'MM/DD/YYYY HH:mm:ss'
    case DateFormat.englishDate:
      return 'YYYY-MM-DD'
    case DateFormat.englishDateTime:
      return 'YYYY-MM-DD HH:mm:ss'
  }
}