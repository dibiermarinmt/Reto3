/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.ciclo3.ciclo3.Service;

import co.usa.ciclo3.ciclo3.Modelo.Calificaciones;
import co.usa.ciclo3.ciclo3.Repository.crud.CalificacionesRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author roll-
 */

@Service
public class CalificacionesService {
      
    
    @Autowired
    private CalificacionesRepository calificacionesRepository;
    
    public List<Calificaciones> getAll(){
    
        return calificacionesRepository.getAll();
        
    }
    
    
    public Optional<Calificaciones> getCalificaciones(int id){
        
        return calificacionesRepository.getCalificaciones(id);
        
    }
    
    public Calificaciones save(Calificaciones s){
    
        if(s.getIdScore()==null){
        
            return calificacionesRepository.save(s);
            
        } 
    
        else {
            Optional<Calificaciones> paux=calificacionesRepository.getCalificaciones(s.getIdScore());
            if(paux.isEmpty()){
                
                return calificacionesRepository.save(s);
                
            }
            
            else{
                
                return s;
                
            }
    }
        

}
    
    
}
