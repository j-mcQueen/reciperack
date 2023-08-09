import { Link } from "react-router-dom";

export default function DashboardTable({ ...props }) {
  return (
    <table className="font-manrope tracking-tighter">
      <thead>
        <tr>
          <th className="p-3">Title</th>
          <th>Details</th>
          <th>Origin</th>
          <th>Category</th>
        </tr>
      </thead>

      <tbody>
        {props.arr.map(
          (item: {
            _id: string;
            title: string;
            category: string;
            source: string;
          }) => (
            <tr className="text-center" key={item._id}>
              <td className="text-xl">{item.title}</td>

              <td className="p-3">
                <Link
                  className="m-3 py-1 px-3 border border-solid border-green rounded-lg bg-offgreen hover:bg-transgreen hover:transition-colors transition-colors"
                  to={`/${props.page}/${item._id}`}
                >
                  View
                </Link>
              </td>
              <td>
                <a
                  className="m-3 py-1 px-3 border border-solid border-gold rounded-lg bg-offgold hover:bg-transgold hover:transition-colors transition-colors"
                  href={item.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                </a>
              </td>
              <td>{item.category ? item.category : "N/A"}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
