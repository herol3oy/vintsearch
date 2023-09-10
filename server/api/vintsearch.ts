import { requestAiChicagoData } from '~/utils/request-ai-chicago-data';
import { requestClevalandData } from '~/utils/request-cleveland-data';
import { requestRijksdata } from '~/utils/request-rijks-data';

const MUSEUM_END_POINTS = [
  requestRijksdata,
  requestClevalandData,
  requestAiChicagoData,
];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userSearchQueryParam = String(query.param);

  try {
    const museumApiRequests = MUSEUM_END_POINTS.map(async (museumApi) => {
      return await museumApi(userSearchQueryParam);
    });

    const data = await Promise.all(museumApiRequests);

    const mergedData = data.reduce((acc, current) => acc.concat(current), []);

    return {
      data: mergedData,
    };
  } catch (error) {
    return [];
  }
});
