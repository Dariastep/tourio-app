import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const places = await Place.findById(id);
    if (!places) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(places);
  }
  if (request.method === "PATCH") {
    const updatedPlace = request.body;
    const places = await Place.findByIdAndUpdate(id, updatedPlace);
    if (!places) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(201).json({ status: "The place is edited" });
  }
  if (request.method === "DELETE") {
    const places = await Place.findByIdAndDelete(id);
    if (!places) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(201).json({ status: "The place is deleted" });
  }
}
