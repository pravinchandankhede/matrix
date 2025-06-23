namespace Matrix.Ingestion.Interfaces;

using Matrix.Ingestion.Models.Request;
using Matrix.Ingestion.Models.Response;

public interface IIngestionConnector
{
    IngestionResponse Ingest(IngestionRequest request);
}
