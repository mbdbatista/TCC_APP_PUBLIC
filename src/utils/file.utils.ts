import moment from 'moment-timezone'
export class FileUtils {
  static readonly downloadFile = (name: string, file: Blob) => {
    const date = moment.tz(new Date(), 'America/Sao_Paulo')
    const filename = `${name}-${date.format('YYYY-MM-DD HH:mm:ss')}.xls`
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  }
}