namespace Matrix.DataRepository.Interfaces;

public interface IRepository<T>
{
    T Add(T entity);
    T Update(T entity);
    void Delete(T entity);
    T GetById(Guid entityUId);
    IEnumerable<T> GetAll();
}
