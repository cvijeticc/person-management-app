function PersonTable({ persons }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th>Tip korisnika</th>
          <th>Datum kreiranja</th>
          <th>Grad</th>
          <th>Adresa</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.surname}</td>
            <td>{person.userType}</td>
            <td>{person.createdDate}</td>
            <td>{person.city}</td>
            <td>{person.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PersonTable;
