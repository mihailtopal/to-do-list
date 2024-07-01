import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const FormattedDate = ({ date }: { date: string | null }) => {
  let formattedDate = dayjs
    .utc(date)
    .local()
    .format("DD MMMM YYYY [at] HH:mm:ss");

  return <span>{formattedDate}</span>;
};

export default FormattedDate;
