import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "truncate",
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 40): string {
    if (value.length > length) {
      return value.substring(0, length) + "...";
    } else {
      return value;
    }
  }
}
