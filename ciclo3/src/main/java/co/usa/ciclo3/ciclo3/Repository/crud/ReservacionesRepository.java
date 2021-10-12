/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.ciclo3.ciclo3.Repository.crud;

import co.usa.ciclo3.ciclo3.Modelo.Reservaciones;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author roll-
 */
@Repository
public class ReservacionesRepository {
 
    
    @Autowired
    private ReservacionesCrudRepository reservacionesCrudRepository;
    
    public List<Reservaciones> getAll(){
    
        return (List<Reservaciones>) reservacionesCrudRepository.findAll();
        
    }
    
    public Optional<Reservaciones> getReservaciones(int id){
    
    return reservacionesCrudRepository.findById(id);
    
    }
    
    public Reservaciones save(Reservaciones s){
    
    return reservacionesCrudRepository.save(s);
    
    }
    
}
