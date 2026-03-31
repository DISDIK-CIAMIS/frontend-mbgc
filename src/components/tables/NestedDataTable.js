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
      { title: "No", data: "No" },
      { title: "Nama SPPG", data: "SPPG" },
      { title: "Alamat", data: "Alamat SPPG" },
      { title: "Tgl Mulai Operasional", data: "Tanggal Mulai Operasional" },
      { title: "Jumlah Penerima Manfaat (orang)", data: "Jumlah Penerima Manfaat (orang)" },
      { title: "Jumlah Relawan (orang)", data: "Jumlah Relawan (orang)" },
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
          <div class="px-4 py-3 bg-light rounded" style="border-left: 4px solid #007bff; margin: 0.5rem 0;">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Kode SPPG</strong>
                    <span class="badge bg-primary fs-6 mt-1">${rowData?.kode_sppg || '-'}</span>
                </div>
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Nama Kepala SPPG</strong>
                    <span class="d-block fw-semibold mt-1">${rowData?.Nama_Kepala_SPPG || '-'}</span>
                </div>
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Jabatan</strong>
                    <span class="d-block mt-1">${rowData?.Jabatan || '-'}</span>
                </div>
                <div class="col-md-6 mb-2">
                    <strong class="d-block text-muted" style="font-size: 0.85rem;">Yayasan Pengampu</strong>
                    <span class="d-block mt-1">${rowData?.['Nama Yayasan'] || '-'}</span>
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
      data={data}
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
