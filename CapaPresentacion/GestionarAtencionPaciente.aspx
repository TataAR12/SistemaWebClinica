<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GestionarAtencionPaciente.aspx.cs" Inherits="CapaPresentacion.GestionarAtencionPaciente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <section class="content-header">
    <div class="text-center">
        <h1>GESTIONAR ATENCIÓN MÉDICA</h1>
    </div>
    <asp:Label ID="lblFechaAtencion" runat="server" Font-Bold="true"></asp:Label>
</section>
    <section class="content invoice">
        <!-- LISTA DE LAS CITAS MEDICAS QUE FUERON REGISTRADAS PARA EL DIA ACTUAL-->
        <asp:DataList ID="dlAtencionMedica" runat="server" CssClass="tabla table-striped" RepeatColumns="1">
            <ItemTemplate>
                <table>
                    <tr>
                        <td rowspan="2">
                            <asp:Image ID="imgPaciente" runat="server" Height="200px" Width="200px" ImageUrl="~/img/avatar2.png" />
                        </td>
                        <td>
                            <strong>&nbsp;&nbsp;ID Cita:</strong>
                            <asp:Label ID="lblIdCita" runat="server" Text="" Font-Size="Medium"></asp:Label>
                            <strong>&nbsp;&nbsp;Nombres:</strong>
                            <asp:Label ID="lblNombres" runat="server" Text="" Font-Size="Medium"></asp:Label>
                            <strong>&nbsp;&nbsp;Primer Apellido:</strong>
                            <asp:Label ID="lblApellidoPaterno" runat="server" Text="" Font-Size="Medium"></asp:Label>
                            <strong>&nbsp;&nbsp;Segundo Apellido:</strong>
                            <asp:Label ID="lblApellidoMaterno" runat="server" Text="" Font-Size="Medium"></asp:Label>
                            <strong>&nbsp;&nbsp;Edad:</strong>
                            <asp:Label ID="lblEdad" runat="server" Text="" Font-Size="Medium"></asp:Label>
                            <strong>&nbsp;&nbsp;Sexo:</strong>
                            <asp:Label ID="lblSexo" runat="server" Text=""></asp:Label>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;<asp:Button ID="btnAtencion" runat="server" CssClass="btn btn-primary" Text="Realizar Atención" />
                        </td>
                        <td>
                             &nbsp;&nbsp;<asp:Button ID="btnCancelar" runat="server" CssClass="btn btn-primary" Text="Cancelar" onClientClic="return confirm('¿Esta seguro que quieres cancelar la cita?')"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>&nbsp;&nbsp;&nbsp;Hora de Atención: </label>
                            <asp:Label ID="lblHora" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                </table>
            </ItemTemplate>
        </asp:DataList>
    </section>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
