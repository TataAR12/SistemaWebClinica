<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="PanelGeneral.aspx.cs" Inherits="CapaPresentacion.PanelGeneral" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <style>

    <style>
        .dashboard-card {
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: 0.3s ease;
        }
        .dashboard-card:hover {
            transform: translateY(-5px);
        }
        .card-icon {
            font-size: 2.5rem;
            color: #007bff;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container mt-4">
        <div class="row">
            <!-- Tarjeta 1 -->
            <div class="col-md-4 mb-4">
                <div class="card dashboard-card p-3">
                    <div class="d-flex align-items-center">
                        <div class="card-icon mr-3"><i class="fas fa-user-injured"></i></div>
                        <div>
                            <h5 class="mb-0">Pacientes</h5>
                            <small class="text-muted">Total registrados</small>
                            <div class="text-primary font-weight-bold">150</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tarjeta 2 -->
            <div class="col-md-4 mb-4">
                <div class="card dashboard-card p-3">
                    <div class="d-flex align-items-center">
                        <div class="card-icon mr-3"><i class="fas fa-calendar-check"></i></div>
                        <div>
                            <h5 class="mb-0">Citas</h5>
                            <small class="text-muted">Hoy</small>
                            <div class="text-success font-weight-bold">23</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tarjeta 3 -->
            <div class="col-md-4 mb-4">
                <div class="card dashboard-card p-3">
                    <div class="d-flex align-items-center">
                        <div class="card-icon mr-3"><i class="fas fa-user-md"></i></div>
                        <div>
                            <h5 class="mb-0">Médicos</h5>
                            <small class="text-muted">Activos</small>
                            <div class="text-info font-weight-bold">12</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <div class="mt-5">
            <h3>Últimas Citas</h3>
            <table class="table table-hover">
                <thead>
                    <tr><th>Paciente</th><th>Médico</th><th>Fecha</th><th>Hora</th></tr>
                </thead>
                <tbody>
                    <tr><td>Juan Pérez</td><td>Dra. Salazar</td><td>11/07/2025</td><td>09:00 AM</td></tr>
                </tbody>
            </table>
        </div>
</asp:Content>