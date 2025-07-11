<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GestionarAtencionPaciente.aspx.cs" Inherits="CapaPresentacion.GestionarAtencionPaciente" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .etiqueta {
            display: block;
            margin-top: 3px;
        }

        .info-paciente {
            font-weight: bold;
            margin-right: 5px;
        }

        .fecha-centrada {
            text-align: center;
            font-size: 18px;
            margin-top: 10px;
            font-weight: bold;
        }

        .tabla {
            width: 100%;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content-header">
        <div class="text-center">
            <h2>GESTIONAR ATENCIÓN MÉDICA</h2>
        </div>
        <div class="fecha-centrada">
            <asp:Label ID="lblFechaAtencion" runat="server"></asp:Label>
        </div>
    </section>

    <section class="content invoice">
        <asp:DataList ID="dlAtencionMedica" runat="server" CssClass="tabla table-striped" RepeatColumns="1" OnItemCommand="dlAtencionMedica_ItemCommand">
            <ItemTemplate>
                <table style="margin-bottom: 30px;">
                    <tr>
                        <td rowspan="2">
                            <asp:Image ID="imgPaciente" runat="server" Height="200px" Width="200px" ImageUrl="~/img/avatar2.png" />
                        </td>
                        <td>
                            <span class="etiqueta"><span class="info-paciente">ID Cita:</span> <asp:Label ID="lblIdCita" runat="server" Text='<%#Eval("IdCita") %>'></asp:Label></span>
                            <span class="etiqueta"><span class="info-paciente">Nombres:</span> <asp:Label ID="lblNombres" runat="server" Text='<%#Eval("Paciente.Nombres") %>'></asp:Label></span>
                            <span class="etiqueta"><span class="info-paciente">Primer Apellido:</span> <asp:Label ID="lblApellidoPaterno" runat="server" Text='<%#Eval("Paciente.ApPaterno") %>'></asp:Label></span>
                            <span class="etiqueta"><span class="info-paciente">Segundo Apellido:</span> <asp:Label ID="lblApellidoMaterno" runat="server" Text='<%#Eval("Paciente.ApMaterno") %>'></asp:Label></span>
                            <span class="etiqueta"><span class="info-paciente">Edad:</span> <asp:Label ID="lblEdad" runat="server" Text='<%#Eval("Paciente.Edad") %>'></asp:Label></span>
                            <span class="etiqueta"><span class="info-paciente">Sexo:</span> <asp:Label ID="lblSexo" runat="server" Text='<%#(Eval("Paciente.Sexo").ToString() == "M"?"Masculino":"Femenino") %>'></asp:Label></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Button ID="btnAtencion" runat="server" CssClass="btn btn-primary" Text="Realizar Atención" CommandName="Registrar" />
                            <asp:Button ID="btnCancelar" runat="server" CssClass="btn btn-danger" Text="Cancelar" CommandName="Cancelar" OnClientClick="return confirm('¿Está seguro que desea cancelar la cita?');" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><strong>Hora de Atención:</strong></label>
                            <asp:Label ID="lblHora" runat="server" Text='<%#Eval("Hora") %>'></asp:Label>
                        </td>
                    </tr>
                </table>
            </ItemTemplate>
        </asp:DataList>
    </section>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>