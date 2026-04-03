// components/tables/NestedDataTable.jsx
"use client";

import { useRef, useEffect, useMemo } from "react";

// DataTables (React wrapper + DT styling)
import DataTable from "datatables.net-react";
import DataTableLib from "datatables.net-dt";

// Register DataTables core/styling
DataTable.use(DataTableLib);

export default function NestedDataTable({ data }) {
  const tableRef = useRef(null);

  const columns = useMemo(
    () => [
      {
        title: "",
        data: null,
        defaultContent: `<i class="fa-solid fa-square-plus" style="cursor: pointer; font-size: 1.2rem; color: #007bff;"></i>`,
        orderable: false,
        className: "details-control text-center",
      },
      { title: "No", data: "id" },
      { title: "Nama SPPG", data: "nama_sppg" },
      { 
        title: "Status Operasional",
        data: "status" ,
        render: (data) => {
          // Define your color mapping based on the status text
          const statusMap = {
            'Aktif': 'bg-success',        // Green
            'Non-Aktif': 'bg-danger',     // Red
            'Dalam Persiapan': 'bg-warning text-dark' // Yellow/Orange
          };

          // Fallback to 'bg-secondary' if the status doesn't match
          const badgeClass = statusMap[data] || 'bg-secondary';
          
          return `<span class="badge ${badgeClass}">${data}</span>`;
        }
      },
      { title: "Status SLHS", data: "status_slhs", defaultContent: "-" },
      { title: "Jumlah Pegawai", data: "jumlah_pegawai", defaultContent: "-" },
    ],
    []
  );

  useEffect(() => {
    const table = tableRef.current?.dt();
    if (!table) return;

    const tbody = table.table().body();

    const onClick = (e) => {
      const target = e.target.closest("td.details-control");
      if (!target) return;

      const tr = target.closest("tr");
      const row = table.row(tr);

      if (row.child.isShown()) {
        // Collapse
        row.child.hide();
        tr.classList.remove("shown");
        target.innerHTML = `<i class="fa-solid fa-square-plus" style="cursor: pointer; font-size: 1.2rem; color: #007bff;"></i>`;
      } else {
        // Expand
        const rowData = row.data();
        
        const detailsHtml = `
          <div class="px-4 py-3 bg-light rounded" style="border-left: 4px solid #000000ff; margin: 0.5rem 0;">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Kode SPPG</strong>
                    <span class="badge bg-primary fs-6 mt-1">${rowData?.kode_sppg || '-'}</span>
                </div>
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Alamat</strong>
                    <span class="d-block fw-semibold mt-1">${rowData?.alamat || '-'}</span>
                </div>
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Kecamatan</strong>
                    <span class="d-block mt-1">${rowData?.kecamatan || '-'}</span>
                </div>
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Desa</strong>
                    <span class="d-block mt-1">${rowData?.desa_kelurahan || '-'}</span>
                </div>
            </div>
          </div>
        `;

        row.child(detailsHtml).show();
        tr.classList.add("shown");
        target.innerHTML = `<i class="fa-solid fa-square-minus" style="cursor: pointer; font-size: 1.2rem; color: #dc3545;"></i>`;
      }
    };

    tbody.addEventListener("click", onClick);

    // Cleanup: detach handlers
    return () => {
      tbody.removeEventListener("click", onClick);
      const fresh = tbody.cloneNode(true);
      tbody.replaceWith(fresh);
    };
  }, []);

  return (
    <DataTable
      ref={tableRef}
      data={data?.sppg || []}
      columns={columns}
      options={{
        paging: true,
        searching: true,
        info: true,
      }}
      className="sppg-datatable"
    />
  );
}
