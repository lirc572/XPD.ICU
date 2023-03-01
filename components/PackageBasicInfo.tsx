import { TrackingInfo } from "../utils/api.ts";

type Props = {
  data: TrackingInfo;
};

export default function PackageBasicInfo({ data }: Props) {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Bill ID
            </th>
            <th scope="col" class="px-6 py-3">
              Channel
            </th>
            <th scope="col" class="px-6 py-3">
              Last Update
            </th>
            <th scope="col" class="px-6 py-3">
              Last Update Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {data.bill_id}
            </th>
            <td class="px-6 py-4">
              {data.channel_id}
            </td>
            <td class="px-6 py-4">
              {data.last_status_desc_full}
            </td>
            <td class="px-6 py-4">
              {data.last_status_time}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
