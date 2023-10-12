using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using webapi.Entities;

namespace webapi.ViewModels;

public class UsersAndBookings
{
  public string bookingNumber { get; set; }

  public string EmailAdress { get; set; }

  public int bookingId { get; set; }

}