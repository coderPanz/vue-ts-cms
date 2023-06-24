import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)
export default function format(dateStr: string, format = 'YYYY-MM-DD hh:mm:ss') {
  const formatDate = dayjs.utc(dateStr).utcOffset(8).format(format)
  return formatDate
}