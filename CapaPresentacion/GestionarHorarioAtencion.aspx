<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GestionarHorarioAtencion.aspx.cs" Inherits="CapaPresentacion.GestionarHorarioAtencion" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content-header">
<h1 style="text-align: center">GESTION DE HORARIOS DE MÉDICOS</h1>
</section>
<section class="content">
    <div class="row">
        <div class="col-md-4">
            <div class="box box-primary">
                <div class="box-header"></div>
                <h3 class="box-title">Datos del Médico</h3>
            </div>
            <div class="box-body">
                <label>Nro. Documento de identidad</label>
                <div class="input-group input-group-sm">
                    <asp:TextBox ID="txtDni" runat="server" CssClass="form-control"></asp:TextBox>
                    <span class="input-group-btn">
                        <asp:Button ID="bntBuscar" CssClass="btn btn-info btn-flat" runat="server" Text="Buscar" />

                    </span>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="box box-primary">
                <div class="box-header"></div>
                <h3 class="box-title">Horario de Atención</h3>
            </div>
            <div class="box-body">

        </div>
        </div>
    </section>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
