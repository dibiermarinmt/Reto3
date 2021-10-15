/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.ciclo3.ciclo3.Service;

import co.usa.ciclo3.ciclo3.Modelo.Reservaciones;
import co.usa.ciclo3.ciclo3.Repository.crud.ReservacionesRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author roll-
 */
@Service
public class ReservacionesService {
   
    @Autowired
    private ReservacionesRepository reservacionesRepository;
    
    public List<Reservaciones> getAll(){
    
        return reservacionesRepository.getAll();
        
    }
    
    
    public Optional<Reservaciones> getReservaciones(int id){
        
        return reservacionesRepository.getReservaciones(id);
        
    }
    
    public Reservaciones save(Reservaciones s){
    
        if(s.getIdReservation()==null){
        
            return reservacionesRepository.save(s);
            
        } 
    
        else {
            Optional<Reservaciones> paux=reservacionesRepository.getReservaciones(s.getIdReservation());
            if(paux.toString().equals("")){
                
                return reservacionesRepository.save(s);
                
            }
            
            else{
                
                return s;
                
            }
    }
}
}
